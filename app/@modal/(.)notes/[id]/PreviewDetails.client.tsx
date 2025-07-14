'use client';

import { useParams, useRouter } from 'next/navigation';
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";


const PreviewDetailsClient = () => {

  const { id } = useParams();
  const router = useRouter();
  
  const closeModal = () => router.back();

  return (
    <Modal onClose={closeModal}>
      <NotePreview id={Number(id)} onClose={closeModal} />
    </Modal>
  );
};

export default PreviewDetailsClient;