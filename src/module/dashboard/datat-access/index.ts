import {
    useQueryClient,
    useMutation,
    useQuery
} from '@tanstack/react-query';
import { ListData } from './data';

export interface ContactBookDetails {
    id: string;
    src?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber?: string;
    mobileNumber: string;
    groups: string[];
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

type ContactBookResponse = ContactBookDetails[];

const useContactBook = () => {
    return useQuery({
        enabled: true,
        queryKey: ['contact-book'],
        queryFn: () => {
            const getContactBookData = localStorage.getItem('contact-book');
            if(!getContactBookData){
                localStorage.setItem('contact-book', JSON.stringify(ListData))
                const contactBook = localStorage.getItem('contact-book');
                return contactBook ? JSON.parse(contactBook) as ContactBookResponse : [];
            }
            return JSON.parse(getContactBookData) as ContactBookResponse;
        }
    });
};

const useAddContact = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async(payload: ContactBookDetails) => {
            const getContactBook = queryClient.getQueryData(['contact-book']) as ContactBookResponse;
            return [payload, ...getContactBook];
        },
        onSuccess: (data: ContactBookResponse) => {
            localStorage.setItem('contact-book', JSON.stringify(data))
            queryClient.setQueryData(['contact-book'], data);
        }
    });
    return {
        saveContact: mutateAsync,
        isPendingSaveContact: isPending
    }
};

const useEditContact = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async(payload: ContactBookDetails) => {
            const getContactBook = queryClient.getQueryData(['contact-book']) as ContactBookResponse;
            return getContactBook.map((contact) => (
                contact.id === payload.id ?
                    {...payload}
                : contact
            ))
        },
         onSuccess: (data: ContactBookResponse) => {
            localStorage.setItem('contact-book', JSON.stringify(data))
            queryClient.setQueryData(['contact-book'], data);
        }
    });
    return {
        editContact: mutateAsync,
        isPendingEditContact: isPending
    }
};

const useDeleteContact = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async(id: string) => {
            const getContactBook = queryClient.getQueryData(['contact-book']) as ContactBookResponse;
            return getContactBook.filter((contact) => contact.id !== id);
        },
          onSuccess: (data: ContactBookResponse) => {
            localStorage.setItem('contact-book', JSON.stringify(data))
            queryClient.setQueryData(['contact-book'], data);
        }
    });
    return {
        deleteContact: mutateAsync,
        isPendingDeleteContact: isPending
    }
}

export {
    useContactBook,
    useAddContact,
    useEditContact,
    useDeleteContact
}