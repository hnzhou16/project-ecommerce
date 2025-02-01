/* global google */
import "./CheckoutPage.css";
import React from "react";
import {useEffect, useRef, useState} from "react";
import {useJsApiLoader} from '@react-google-maps/api'
import {authAPI, mapsAPIKey} from "../consts";
import {Library} from "@googlemaps/js-api-loader";
import {HeaderConcise} from "../shared/HeaderConcise";
import {Footer} from "../shared/Footer";
import {OrderSummary} from "../mybag/OrderSummary";
import {setShippingCost} from "../../redux/actions/shoppingCartAction";
import {useDispatch} from "react-redux";
import {addUserInfo} from "../../redux/actions/authAction";
import {useNavigate} from "react-router-dom";

const libs: Library[] = ["core", "maps", "places", "marker"]
const states = [
  '', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];
const countries = ['USA']

export const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userSaved = localStorage.getItem('user')
  const userId = userSaved ? JSON.parse(userSaved).id : null
  const [activeOption, setActiveOption] = useState(0)
  const [errors, setErrors] = useState({})

  const [formData, updateFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    country: 'USA',
    stateUSA: '',
    city: '',
    zipcode: '',
    street_address: '',
    shipping_cost: 0
  })

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: mapsAPIKey,
    libraries: libs
  })
  const autoCompleteRef = useRef(null)
  const placeAutoCompleteRef = useRef(null)


  useEffect(() => {
    if (isLoaded && placeAutoCompleteRef) {
      // OPTIONAL: define a map center to bound searching range
      // const location = new google.maps.LatLng(43.65245414078278, -79.3802615602835);
      // const radius = 50000;
      // 'google' is async, can not recognize in static
      // MUST add /* global google */ at the first line
      autoCompleteRef.current = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current, {
          componentRestrictions: {'country': [formData.country]},
          fields: ['address_components', 'geometry', 'formatted_address'],
          types: ['address'],
          // bounds: new google.maps.Circle({
          //     center: location,
          //     radius: radius
          // }).getBounds(),
          // strictBounds: false
        })
      autoCompleteRef.current.addListener('place_changed', onPlaceChanged)
    }
  }, [isLoaded, formData.country]);

  const onPlaceChanged = () => {

    const place = autoCompleteRef.current.getPlace()

    if (place && place.formatted_address) {
      const addressComponents = place.address_components

      const getComponentName = (type) => {
        const component = addressComponents.find(component => component.types.includes(type))
        return component ? component.long_name : ''
      }

      const streetNumber = getComponentName('street_number')
      const streetName = getComponentName('route')
      const city = getComponentName('locality')
      const stateUSA = getComponentName('administrative_area_level_1')
      const zipcode = getComponentName('postal_code')

      const street_address = `${streetNumber} ${streetName}`.trim()

      updateFormData(prevState => ({
        ...prevState,
        street_address,
        city,
        stateUSA,
        zipcode
      }));
    }
  }

  const changeHandler = ({target}) => {
    const {name, value} = target
    updateFormData(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const handleShippingCost = (e) => {
    const cost = parseFloat(e.currentTarget.getAttribute("data-value"));
    updateFormData(prevState => ({
      ...prevState, shipping_cost: cost
    }))
    dispatch(setShippingCost(cost));
  }

  const handleShippingOption = (i) => {
    setActiveOption(i);
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const newErrors = {}

    for (const field of Object.keys(formData)) {
      if (!formData[field]) {
        newErrors[field] = `Please enter your ${field.split('_')}.`
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        continue
      }
      setErrors({})
    }

    try {
      const response = await fetch(`${authAPI}/update-info/${userId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const res = await response.json()
        let shoppingCart = res.data.cart.cartItems
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

        let userInfo = {...res.data}
        delete userInfo.cart

        localStorage.setItem('user', JSON.stringify(userInfo))
        dispatch(addUserInfo(userInfo))

        console.log('HERE')

        navigate('/shop/checkout/payment')
      }
    }
    catch (err) {
      console.error('Error updating user info.', err)
    }
  }

  return <>
    <div>
      <HeaderConcise/>
      <div className="checkoutMain">
        <h1>Checkout</h1>
        <div className="checkoutWrapper">

          <div className="checkoutBody">
            {/*<p>{JSON.stringify(formData)}</p>*/}

            <form onSubmit={submitHandler}>
              <div className="section">
                <div className="sectionTitle">Contact information</div>
                <div className="email">
                  Email Address
                </div>
                <input className={errors.email ? 'inputError' : ''}
                       name='email'
                       id="email"
                       type="text"
                       onChange={changeHandler}/>
                <div className="error">{errors.email ? errors.email : ''}</div>
              </div>

              <div className="section">
                <div className="sectionTitle">Shipping address</div>
                <div className="country">
                  <label htmlFor="" className="title">Country</label>
                  <select className='country'
                          id='country'
                          name='country'
                          value={formData.country}
                          onChange={changeHandler}>
                    {countries.map((country, i) =>
                      <option key={i} value={country}>{country}</option>
                    )}
                  </select>
                </div>
                <div className="userInfo">
                  <div className='userName'>
                    <label htmlFor="first_name" className="title">First name</label>
                    <input className={errors.first_name ? 'inputError' : ''}
                           type="text"
                           name="first_name"
                           id="first_name"
                           onChange={changeHandler}/>
                    <div className="error">{errors.first_name ? errors.first_name : ''}</div>
                  </div>
                  <div className='userName'>
                    <label htmlFor="last_name" className="title">Last name</label>
                    <input className={errors.last_name ? 'inputError' : ''}
                           type="text"
                           name="last_name"
                           id="last_name"
                           onChange={changeHandler}/>
                    <div className="error">{errors.last_name ? errors.last_name : ''}</div>
                  </div>
                </div>
                <div className="street_address">
                  <label htmlFor='street_address'>Address</label>
                  <input
                    className={errors.street_address ? 'inputError' : 'street_address'}
                    id={'street_address'}
                    name={'street_address'}
                    ref={placeAutoCompleteRef}
                    value={formData.street_address}
                    onChange={changeHandler}
                    placeholder="Include apt, suite, or floor number here"
                  />
                  <div className="error">{errors.street_address ? errors.street_address : ''}</div>
                </div>

                <div className="cityInfo">
                  <div className="city">
                    <label htmlFor='city'>City</label>
                    <input
                      className={errors.city ? 'inputError' : 'city'}
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={changeHandler}
                      placeholder="Enter a city"/>
                    <div className="error">{errors.city ? errors.city : ''}</div>
                  </div>
                  <div className="state">
                    <label htmlFor='state'>State</label>
                    <select className={errors.stateUSA ? 'inputError' : 'state'}
                            id='stateUSA'
                            name='stateUSA'
                            value={formData.stateUSA}
                            onChange={changeHandler}>
                      {states.map((state, i) =>
                        <option key={i} value={state}>{state}</option>
                      )}
                    </select>
                    <div className="error">{errors.stateUSA ? errors.stateUSA : ''}</div>
                  </div>
                  <div className="city">
                    <label htmlFor='zipcode'>Zipcode</label>
                    <input
                      className={errors.zipcode ? 'inputError' : 'city'}
                      id='zipcode'
                      name='zipcode'
                      value={formData.zipcode}
                      onChange={changeHandler}
                      placeholder="Enter a zipcode"/>
                    <div className="error">{errors.zipcode ? errors.zipcode : ''}</div>
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="sectionTitle">
                  Shipping options
                </div>
                <div className="shippingOptions">
                  <div
                    data-value="0"
                    className="option"
                    onClick={(e) => {
                      handleShippingOption(0);
                      handleShippingCost(e);
                    }}
                  >
                    <div
                      className={`optionCheckbox ${activeOption === 0 ? "optionCheckboxClicked" : ""}`}
                    ></div>
                    <div className="optionContent">
                      <div className="top">2-7 business days</div>
                      <div className="bottom">Standard shipping (FREE)</div>
                    </div>
                  </div>
                  <div
                    data-value="20"
                    className="option"
                    onClick={(e) => {
                      handleShippingOption(1);
                      handleShippingCost(e);
                    }}
                  >
                    <div
                      className={`optionCheckbox ${activeOption === 1 ? "optionCheckboxClicked" : ""}`}
                    ></div>
                    <div className="optionContent">
                      <div className="top">2-4 business days</div>
                      <div className="bottom">Express Shipping ($20.00)</div>
                    </div>
                  </div>
                  <div
                    data-value="30"
                    className="option"
                    onClick={(e) => {
                      handleShippingOption(2);
                      handleShippingCost(e);
                    }}
                  >
                    <div
                      className={`optionCheckbox ${activeOption === 2 ? "optionCheckboxClicked" : ""}`}
                    ></div>
                    <div className="optionContent">
                      <div className="top">2-3 business days</div>
                      <div className="bottom">Priority Shipping ($30.00)</div>
                    </div>
                  </div>
                </div>
              </div>
              <button type='submit' className='goToNext'>GO TO NEXT STEP</button>
            </form>

          </div>
          <div className="orderSummary">
            <OrderSummary/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </>
}