// AboutSection.tsx
import { AboutContainer, BioBox, Title, CreatorImage, StoryText } from '../../styles/public/AboutStyles';
import creatorImg from '../../assets/images/carito.jpg';

export const AboutSection = () => {
    return (
        <AboutContainer>
            <Title>Conócenos</Title>
            <BioBox>
                <CreatorImage src={creatorImg} alt="Creadora de Sweeties Crochet Arts" />
                <StoryText>
                    ¡Hola! 👋 Soy <strong>Carolina</strong>, la mente y manos detrás de <em>Sweeties | Crochet Arts</em>. <br /><br />
                    Cada una de mis creaciones está hecha con amor, cuidado y muchos sueños tejidos. Lo que comenzó como un pasatiempo pronto se convirtió en una pasión por crear sonrisas en forma de muñequitos de crochet. 🧸🧵 <br /><br />
                    Mi inspiración nace de la infancia, la ternura y la magia de los detalles. Gracias por visitar este pequeño rincón del internet donde cada puntada tiene corazón 💖.
                </StoryText>
            </BioBox>
        </AboutContainer>
    );
};
