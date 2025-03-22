import useSWR from 'swr' //vercel developed package useful for fetching data
import fetcher from '@/lib/fetcher'

const useCurrentUser = () => {
    const { data,error,isLoading, mutate } = useSWR("/api/current",fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    };
}; 

export default useCurrentUser;