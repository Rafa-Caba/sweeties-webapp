import { AboutContainer, BioBox, Title, CreatorImage, StoryText } from '../../styles/public/AboutStyles';
import defaultCreatorImg from '../../assets/images/carito.jpg';
import { usePublicSettingsStore } from '../../store/public/usePublicSettingsStore';

export const AboutSection = () => {
    const { settings } = usePublicSettingsStore();

    // 1. Dynamic Values with Fallbacks
    const siteName = settings?.siteName || 'Sweeties | Crochet Arts';
    
    // Logic: If 'creatorName' exists in DB (e.g. "por Sweeties"), use it, 
    // otherwise fallback to "Carolina". 
    // We remove "por " if it exists to make it sound natural in the sentence "Soy [Name]".
    const rawCreatorName = settings?.home?.creatorName || 'Carolina';
    const creatorName = rawCreatorName.replace(/^por\s+/i, ''); 

    // 1. Get Dynamic Bio
    // If DB is empty, fallback to hardcoded text (optional)
    const bioText = settings?.about?.bio || `¡Hola! 👋 Soy ${creatorName}... (default text)`;

    // 2. Get Dynamic Image
    const creatorImg = settings?.about?.imageUrl || defaultCreatorImg;

    return (
        <AboutContainer>
            <Title>Conócenos</Title>
            <BioBox>
                <CreatorImage src={creatorImg} alt={`Creadora de ${siteName}`} />
                
                <StoryText>
                    {bioText.split('\n').map((line, i) => (
                        <span key={i}>
                            {line}
                            <br />
                        </span>
                    ))}
                </StoryText>
            </BioBox>
        </AboutContainer>
    );
};
