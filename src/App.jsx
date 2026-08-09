import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeMenu from './components/HomeMenu';
import PrivacyModal from './components/PrivacyModal';
import EditorApp from './components/EditorApp';
import UxLibrary from './components/UxLibrary';

export default function App() {
  const [step, setStep] = useState('splash');
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('menu');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (step === 'splash') return <SplashScreen />;
  if (step === 'editor') return <EditorApp onBackMenu={() => setStep('menu')} />;
  if (step === 'ux') return <UxLibrary onBackMenu={() => setStep('menu')} />;

  return (
    <>
      <HomeMenu 
        onStart={() => setStep('editor')} 
        onOpenUx={() => setStep('ux')} 
        onOpenPrivacy={() => setShowPrivacy(true)} 
      />
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  );
}
