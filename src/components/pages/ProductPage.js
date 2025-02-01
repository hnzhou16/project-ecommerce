import './ProductPage.css'
import React from "react"
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {singleProductUrl} from "../consts";
import {HeaderConcise} from "../shared/HeaderConcise";
import {AddToBag} from "../product/AddToCart";
import {addItems, addItemsToBackend, setCartItemsCount, setTotalPreTax} from "../../redux/actions/shoppingCartAction";
import {Reviews} from "../product/Reviews";
import {VerifyToken} from "../login/VerifyToken";
import {useCheckTokenExpiration} from "../login/useCheckTokenExpiration";
import {Footer} from "../shared/Footer";

export const ProductPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const checkTokenExpiration = useCheckTokenExpiration()

  const [isSticky, setIsSticky] = useState(true);
  const sentinelRef = useRef(null);

  const {productId} = useParams()

  const [color, setColor] = useState()
  const [colorId, setColorId] = useState()
  const [product, setProduct] = useState()
  const [images, setImages] = useState()
  const [size, setSize] = useState()
  const [priceNumber, setPriceNumber] = useState()
  const [name, setName] = useState()

  const [sizeError, setSizeError] = useState('')

  const [imageIndex, setImageIndex] = useState(0)

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
  const cartItemsCount = useSelector(state => state.shoppingCartReducer.cartItemsCount)
  const isLogin = useSelector(state => state.authReducer.login)

  const prevImg = () => {
    if (imageIndex - 1 >= 0) {
      setImageIndex(imageIndex - 1)
    }
  }

  const nextImg = () => {
    if (imageIndex + 1 <= images?.length) {
      setImageIndex(imageIndex + 1)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const sentinel = sentinelRef.current;
    // An IntersectionObserver monitors the visibility of the sentinel element relative to its viewport (root).
    const observer = new IntersectionObserver(
      ([entry]) => {
        // callback is called whenever the sentinel visibility changes
        // if sentinel and viewport 'isIntersecting', set false to isSticky
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null, // Observes the sentinel relative to the browser's viewport.
        threshold: 0,
      }
    );

    // define the 'entry' here
    if (sentinel) {
      observer.observe(sentinel);
    }

    // Lifecycle: clean up (disconnect) observer when the component unmounted (clear up memory to save space and CPU)
    // unmount happens when 1. Navigate to another page 2. Conditional rendering 3. Close the tab
    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, []);

  useEffect(() => {
    // 'useParams' is used for path parameters, e.g. ':productId'
    // 'URLSearchParams' is used for query parameters including full string after '?', e.g. '?colorId=...size=...'
    const params = new URLSearchParams(location.search)
    const colorId = params.get('colorId')
    fetch(`${singleProductUrl}/${productId}`)
      .then(res => res.json())
      .then(res => {
        // only fetch product once when page is loaded
        console.log(res.data)
        const {data} = res
        setProduct(data)

        // 'setColorId' after 'setProduct'
        // so useEffect depending on colorId will have a product to render
        setColorId(colorId)

        // also save the info that won't change with color selection
        const price = data.price
        const priceNumber = parseFloat(price).toFixed(2)
        setPriceNumber(priceNumber)

        setName(data.name)

      })
  }, [])

  useEffect(() => {
    // then update the image/details with colorId dependency
    if (product) {
      const productImages = product?.mainCarousel.find(carousel => carousel.colorId === colorId)
      if (productImages) {
        setImages(productImages.images)
      }

      const swatch = product?.swatches.find(swatch => swatch.colorId === colorId)
      if (swatch) {
        setColor(swatch.name)
      }
    }

    // if colorId is not set after 'setProduct', MUST include product as a dependency to run the initial state
    // dependency needs to be product NOT productId
    // because productId is from url, would render nothing without fetching the actual product
  }, [colorId])

  useEffect(() => {
    const total = shoppingCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    dispatch(setTotalPreTax(total.toFixed(2)))

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    const cartItemsCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    dispatch(setCartItemsCount(cartItemsCount))
  }, [shoppingCart, isLogin]);


  const handleAddToBag = () => {
    if (product?.size.length !== 0 && !size) {
      setSizeError("Please select a size.")
      return
    }

    const cartItem = {
      productId,
      colorId,
      color,
      size,
      quantity: 1,
      price: priceNumber,
      image: images[0],
      name
    }

    dispatch(addItems(cartItem))

    let isLogin = false
    if (checkTokenExpiration() && VerifyToken()) {
      isLogin = true
    }

    if (isLogin) {
      const user = localStorage.getItem('user')
      if (user) {
        const parsedUser = JSON.parse(user)
        const userId = parsedUser.id
        dispatch(addItemsToBackend(userId, cartItem))
      } else {
        console.error('User not found in local storage.')
      }
    }
  }

  return <>
    <div ref={sentinelRef}></div>
    <HeaderConcise isSticky={isSticky}/>
    <div className="productPageInfo">
      <div className="carousel">
        <div className="carouselArrows">
          <button className="left"
                  onClick={() => prevImg()}
                  disabled={imageIndex <= 0}
          >
            {'<'}
          </button>
          <button className="right"
                  onClick={() => nextImg()}
                  disabled={imageIndex >= images?.length - 1}>
            {'>'}
          </button>
        </div>
        <img src={images && images[imageIndex]} alt="Product Image"/>
      </div>
      <div className="productDetails">
        <div className="category">{`${product?.gender}/${product?.category}`}</div>
        <h1>{name}</h1>
        <div className="productPrice">
          <div className="number">{`$${priceNumber}`}</div>
          <p>USD</p>
        </div>
        <div className="productColor">
          <h3>Color</h3>
          <p>{color}</p>
        </div>
        <div className="productSwatches">
          {product &&
            product.swatches
              .map((item, index) =>
                <div
                  key={`swatch-${index}`}
                  className={item.colorId === colorId ? 'swatchSelected' : 'swatch'}
                  style={{background: `url(${item.url})`}}
                  onMouseEnter={() => {
                    setColor(item.name)
                    setColorId(item.colorId)
                  }}
                  onClick={() => {
                    setColor(item.name)
                    setColorId(item.colorId)
                  }}
                ></div>
              )}
        </div>
        <div className="productSizes">
          {sizeError && !size &&
            <div className="selectSizeError">
              <div className="errorIcon">!</div>
              <p>{sizeError}</p>
            </div>
          }
          <div className="selectSize">
            <h3>Select Size</h3>
            <p>{size}</p>
          </div>
          <div className="sizes">
            {product &&
              product.size.map((s, i) =>
                <button key={`size-${i}`}
                        className={s === size ? 'selected' : ''}
                        onClick={() => setSize(s)}>{s}
                </button>)}
          </div>
        </div>
        <AddToBag handleAddToBag={handleAddToBag}/>
      </div>
    </div>
    <Reviews/>
    <Footer/>
  </>
}