import { useNavigate } from 'react-router-dom';
import {
    CreatorName,
    MainWrapper,
    NavButtonsWrapper,
    NavCircleButton,
    NeedleIcon,
    Subtitle,
    Title,
    TopSection
} from '../../styles/public/InicioStyles';
import needleImg from '../../assets/needle-icon.png';

export const InicioSection = () => {
    const navigate = useNavigate();

    return (
        <MainWrapper>
            <NeedleIcon src={needleImg} alt="Needle Icon" />
            <TopSection>
                <Title>Sweeties</Title>
                <Subtitle>Crochet Arts</Subtitle>
                <CreatorName>By Caritop Dominguez</CreatorName>
            </TopSection>

            <NavButtonsWrapper as="nav" aria-label="Secciones del sitio">
                <NavCircleButton $position="left" onClick={() => navigate('/ordenar')}>Ordenar</NavCircleButton>
                <NavCircleButton $position="left-center" onClick={() => navigate('/galeria')}>Galería</NavCircleButton>
                <NavCircleButton $position="center" onClick={() => navigate('/materiales')}>Materiales</NavCircleButton>
                <NavCircleButton $position="right-center" onClick={() => navigate('/contacto')}>Contáctanos</NavCircleButton>
                <NavCircleButton $position="right" onClick={() => navigate('/conocenos')}>Conócenos</NavCircleButton>
            </NavButtonsWrapper>
        </MainWrapper>
    );
};
