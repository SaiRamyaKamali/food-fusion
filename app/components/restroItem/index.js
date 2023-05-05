import { useState } from 'react'
import './index.css'

const PLUS_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
const MINUS_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'

const RestroItem = ({name,rating,type,vicinity,photo}) => {
  const [isActive, setIsActive] = useState(false)
  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const renderAnswer = () => {
    if (isActive) {
      return (
        <div>
          <hr className="horizontal-line" />
          <h3>{name}</h3>
          <p>{rating}</p>
          <p>{type}</p>
          <p>{vicinity}</p>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${apiKey}`} alt={name} />

        </div>
      )
    }
    return null
  }

  const onToggleIsActive = () => {
    setIsActive(prevState => !prevState)
  }

  const renderActiveImage = () => {
    const image = isActive ? MINUS_IMAGE : PLUS_IMAGE
    const altText = isActive ? 'minus' : 'plus'

    return (
      <button className="button" type="button" onClick={onToggleIsActive}>
        <img className="image" src={image} alt={altText} />
      </button>
    )
  }

  return (
    <li className="restro-item">
      <div className="restro-container">
        <h1 className="restro">{name}</h1>
        <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
        <button onClick={() => setDislikes(dislikes + 1)}>👎 {dislikes}</button>
        {renderActiveImage()}
      </div>
      {renderAnswer()}
    </li>
  )
}

export default RestroItem
