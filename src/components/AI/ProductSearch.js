import "./ProductSearch.css";
import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AIAPI, fetchProductsUrl} from "../consts";
import {ProductSnip} from "./ProductSnip";

export const ProductSearch = () => {
  const dispatch = useDispatch();

  const isChatOpen = useSelector(state => state.AIReducer.isChatOpen)

  const [messages, setMessages] = useState([
    { text: `Emma: Hi, I'm Emma. I'm programmed to help you find the products you need!`, sender: "ai" }]);
  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: `You: ${input}`, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch(AIAPI, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({input: input})
      })

      if (!response.ok) {
        console.log('Failed to fetch AI response.')
      }
      const responseData = await response.json()
      const requestBody = responseData.data;

      const productResponse = await fetch(fetchProductsUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
      })
      const productData = await productResponse.json()
      const products = productData?.data.slice(0, 3)

      let aiMessage;

      if (products.length > 0) {
        aiMessage = {
          text: "AI: Here are some product suggestions for you.",
          sender: "ai",
          products: products
        };
      } else {
        aiMessage = { text: "AI: Sorry, we can't find any products that match your request. Please try again.", sender: "ai" };
      }

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setProducts(products);

    } catch (error) {
      console.error('Error communicating with AI assistant:', error);
      const aiErrorMessage = { text: 'AI: Sorry, something went wrong.', sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
    }

    setInput('');
  };

  return (
    <div className="chatContainer">
      <h2>Emma: AI Assistant</h2>
      <div className="chatMessages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "userMessage" : "aiMessage"}`}
          >
            {message.text}
            {message.products &&
              products.map((product, i) => <ProductSnip product={product} key={i}/>)
            }
          </div>
        ))}
      </div>

      <div className="inputContainer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Tell use what you're looking for..."
        />
        <button onClick={handleSendMessage}>
          SEND
        </button>
      </div>
    </div>
  );
};