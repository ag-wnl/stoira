import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { api } from '~/utils/api'
import { useRef, useState } from 'react'
import Link from 'next/link';

export default function SearchPosts() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // searchPosts
    const {data: searchResults, isLoading, isError} = api.post.searchPosts.useQuery({term: searchQuery});

    const handleDeboucing = (input: string) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setSearchQuery(input);
        }, 400)
    }
    
    return (
        <div className='flex flex-col w-4/6 md:w-4/5'>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input 
                onChange={(e) => handleDeboucing(e.currentTarget.value)}
                type='tel' borderRadius={'full'} color='gray.200' placeholder='Search' _placeholder={{ color: 'gray.400' }} />
            </InputGroup>

            <div className='flex flex-col items-center'>
            {searchResults && searchResults.length > 0 && (
                <div className='absolute z-30 bg-slate-800 overflow-auto'>
                    {searchResults.map((result) => (
                        <Link key={result.id} href={`/post/${result.id}`}>
                            <div className='bg-gray-700 text-white text-sm p-2 mb-2 border-b-2'>{result.title}</div>
                        </Link>
                    ))}
                </div>
            )}
            </div>
        </div>
    )
}