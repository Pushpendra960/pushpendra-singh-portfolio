import { useState } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Certifications } from '../components/Certifications';
import { Achievements } from '../components/Achievements';
import { Education } from '../components/Education';
import { Contact } from '../components/Contact';
import { CertificateModal, LightboxItem } from '../components/CertificateModal';
import { CredentialItem } from '../data/certifications';

export function Home() {
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem | null>(null);
  const [credentialList, setCredentialList] = useState<CredentialItem[]>([]);
  const [credentialIndex, setCredentialIndex] = useState<number>(-1);

  const openStandaloneDocument = (item: LightboxItem) => {
    setCredentialList([]);
    setCredentialIndex(-1);
    setActiveLightbox(item);
  };

  const openCredentialLightbox = (cred: CredentialItem, visibleList: CredentialItem[]) => {
    const idx = visibleList.findIndex((c) => c.id === cred.id);
    setCredentialList(visibleList);
    setCredentialIndex(idx);
    setActiveLightbox({
      title: cred.title,
      subtitle: cred.issuer,
      imagePath: cred.imagePath,
      issueDate: cred.issueDate,
      expiryDate: cred.expiryDate,
      credentialId: cred.credentialId,
      verificationUrl: cred.verificationUrl,
      kind: cred.kind,
    });
  };

  const goToCredential = (nextIdx: number) => {
    const target = credentialList[nextIdx];
    if (!target) return;
    setCredentialIndex(nextIdx);
    setActiveLightbox({
      title: target.title,
      subtitle: target.issuer,
      imagePath: target.imagePath,
      issueDate: target.issueDate,
      expiryDate: target.expiryDate,
      credentialId: target.credentialId,
      verificationUrl: target.verificationUrl,
      kind: target.kind,
    });
  };

  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience onOpenDocument={openStandaloneDocument} />
        <Achievements onOpenDocument={openStandaloneDocument} />
        <Certifications onSelectCredential={openCredentialLightbox} />
        <Education />
        <Contact />
      </main>

      <CertificateModal
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
        hasPrev={credentialIndex > 0}
        hasNext={credentialIndex >= 0 && credentialIndex < credentialList.length - 1}
        onPrev={() => goToCredential(credentialIndex - 1)}
        onNext={() => goToCredential(credentialIndex + 1)}
      />
    </>
  );
}
