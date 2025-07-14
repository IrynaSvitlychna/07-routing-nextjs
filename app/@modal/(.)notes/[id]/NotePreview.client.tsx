'use client';

import { useParams, useRouter } from 'next/navigation';
import Modal from "@/components/Modal/Modal";
import NotePreviewModal from '@/components/NotePreviewModal/NotePreviewModal';


const NotePreview = () => {

  const { id } = useParams();
  const router = useRouter();
  
  const closeModal = () => router.back();

  return (
    <Modal onClose={closeModal}>
      <NotePreviewModal id={Number(id)} onClose={closeModal} />
    </Modal>
  );
};

export default NotePreview;