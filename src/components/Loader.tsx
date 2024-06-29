import { Spinner } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText, Box, Stack } from '@chakra-ui/react'

export function LoaderSpinner() {
  return <div><Spinner /></div>;
}

export function PostSkeletonLoader() {
  return (
    <div className='flex flex-col gap-10'>
      <Box padding='6' boxShadow='lg'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>

      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    </div>
  )
}

export function PostPageSkeletonLoader() {
  return (
    <div className='flex flex-col gap-10'>
      <Box padding='6' boxShadow='lg'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>

      <Box padding='6' boxShadow='lg'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>

      <Box padding='6' boxShadow='lg'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    </div>
  )
}


export function ProfileSkeletonLoader() {
  return (
    <div>
      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
    </Stack>
    </div>
  )
}


export function CommentSkeletonLoader() {
  return (
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  )
}