import { Link } from 'react-router-dom'

import styles from './styles.module.css'
import { Photo } from '../../models/Photo'


type Props = {
  photo: Photo
}

//const CHARACTERS_LIMIT = 30
const WORDS_LIMIT = 10

const ResultCard = ({ photo }: Props) => {

  const sanitizeDescription = (description: string) => {
    if(description) {
      const words = description.split(' ')
      let counter = 0
      let index = 0
      const safeWords: string[] = []

      while(counter < WORDS_LIMIT && index < words.length) {
        try {
          new URL(words[index])
          safeWords.push('(...)')
        } catch(err) {
          safeWords.push(words[index])
          counter++
        }
        index++
      }

      return safeWords.join(' ')
    }
  }

  return (
    <div className={styles.card}>
      <Link to='/view' state={{ photo }}>
        <img
          className={styles.cardThumb}
          src={photo.thumbURL}
          alt={photo.description}
        />
      </Link>

      {photo.description && (
        <h3 className={styles.cardDescription}>
          {sanitizeDescription(photo.description)}
        </h3>
      )}
    </div>
  )
}

export default ResultCard
