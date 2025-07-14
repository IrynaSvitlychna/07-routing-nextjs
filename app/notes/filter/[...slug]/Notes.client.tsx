'use client';

import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from "@/components/NoteForm/NoteForm";
import { type PaginatedNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { type Note, Tag } from '@/types/note';
  import {
    useQuery,
    keepPreviousData,
} from "@tanstack/react-query";

  
type NotesClientProps = {
    initialData: {
      notes: Note[];
      totalPages: number;
  };
  initialTag: string | undefined;
  };
  

const NotesClient = ({ initialData, initialTag }:NotesClientProps ) => {
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearchQuery] = useDebounce(currentQuery, 500);
  const [isModalOpen, setIsModalOpen] = useState(false); 
 
   
  
    const { data,  isLoading, isError, } = useQuery<
      PaginatedNotesResponse>({
        queryKey: ["notes", debouncedSearchQuery, currentPage, initialTag],
        queryFn: () =>
          fetchNotes(
            debouncedSearchQuery,
            currentPage,
            initialTag !== "All" ? (initialTag as Tag) : undefined
          ),
          placeholderData: keepPreviousData,
          initialData: initialData,
      });
  
        
    const handleSearch = (value: string) => {
      setCurrentQuery(value);
      setCurrentPage(1); 
    };
  
    return (
  
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={currentQuery} onSearch={handleSearch} />
          
          {data && data.totalPages > 1 && (
            <Pagination
            totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
  
          <button
            className={css.button}
            onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
        
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
          )}

        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
        
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        
        {data && data.notes.length > 0 ? (
       <NoteList notes={data.notes} />
        ) : (
       <p>No notes found.</p>
        )}
      </div>
    );
  }
  
  export default NotesClient;