import { useEffect, useState } from 'react'
import './index.css'

const PLUS_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
const MINUS_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'

const RestroItem = ({name,rating,type,vicinity,photo,mostRestro}) => {
  const [isActive, setIsActive] = useState(false)
  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [mRestro, setMRestro] = useState([]);

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
  useEffect(() => {
    if(mRestro.length > 0) {
      const randomIndex = Math.floor(Math.random() * mRestro.length);
      const mostLikedRestro = mRestro[randomIndex];
      mostRestro(mostLikedRestro);
    }
  }, [mRestro, mostRestro]);
  
  const handleLikeClick = () => {
    if (likes < 2) {
      setLikes(likes + 1);
      setMRestro(prevMRestro => [
        ...prevMRestro,
        {
          likes: likes + 1,
          name,
          rating,
          type,
          vicinity,
          photo,
        },
      ]);
    }
    console.log(mRestro);
  };

  const handleDislikeClick = () => {
    if(dislikes<2)
    {
    setDislikes(dislikes + 1);
    }
  }

  return (
    <li className="restro-item">
      <div className="restro-container">
        <h1 className="restro">{name}</h1>
        <div className="end">
        {renderActiveImage()}
        <button onClick={handleLikeClick} className="like-button">👍 {likes}</button>
        </div>
      </div>
      {renderAnswer()}
    </li>
  )
}

export default RestroItem
