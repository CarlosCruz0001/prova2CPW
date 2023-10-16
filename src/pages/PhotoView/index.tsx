import { Link, useLocation } from 'react-router-dom'
import { Photo } from '../../models/Photo'
import styles from './styles.module.css'

type Location = {
    state: {
        photo: Photo
    }
}

const PhotoView = () => {
    const location: Location = useLocation()
    const { photo } = location.state

    return (
        <div className={styles.container}>
            <img 
                className={styles.photo} 
                src={photo.regularURL} 
                alt={photo.description} />
            
            <div className={styles.metadataPanel}>

                {photo.description && (
                    <div className={styles.metadata}>
                        <span className={styles.metadataTitle}>
                            Descrição:
                        </span>

                        <span className={styles.metadataValue}>
                            {photo.description}
                        </span>
                    </div>
                )}

                <div className={styles.metadata}>
                    <span className={styles.metadataTitle}>
                        Criador:
                    </span>

                    <span className={styles.metadataValue}>
                        {photo.creatorName}
                    </span>
                </div>

                <div className={styles.metadata}>
                    <span className={styles.metadataTitle}>
                        Data de criação:
                    </span>

                    <span className={styles.metadataValue}>
                        {photo.creationDate.toLocaleDateString()}
                    </span>
                </div>
            </div>

            <Link 
                className={styles.backButton} 
                to='/'>
                Voltar
            </Link>
        </div>
    )
}

export default PhotoView
