import { useState, useCallback } from 'react'
import useNotifyMutation from './useNotifyMutation'
import useRemoveAlbumFromLibraryMutation from './useRemoveAlbumFromLibraryMutation'
import useAddAlbumToLibraryMutation from './useAddAlbumToLibraryMutation'
import PlusIcon from '../components/PlusIcon'
import MinusIcon from '../components/MinusIcon'

interface Album {
  id: string
  savedToLibrary: boolean
}

const useAlbumInLibraryToggle = ({ id, savedToLibrary }: Album) => {
  const [loading, setLoading] = useState(false)
  const notify = useNotifyMutation()
  const removeAlbumFromLibrary = useRemoveAlbumFromLibraryMutation()
  const addAlbumToLibrary = useAddAlbumToLibraryMutation()
  const transaction = async (fn: () => Promise<void>) => {
    setLoading(true)
    await fn()
    setLoading(false)
  }

  const add = useCallback(() => {
    transaction(async () => {
      await addAlbumToLibrary(id)
      notify({ message: 'Saved to Your Library' })
    })
  }, [addAlbumToLibrary, id, notify])

  const remove = useCallback(() => {
    transaction(async () => {
      await removeAlbumFromLibrary(id)
      notify({ message: 'Removed from Your Library' })
    })
  }, [removeAlbumFromLibrary, id, notify])

  return {
    loading,
    message: savedToLibrary
      ? 'Remove from Your Library'
      : 'Save to Your Library',
    toggle: savedToLibrary ? remove : add,
    Icon: savedToLibrary ? MinusIcon : PlusIcon
  }
}

export default useAlbumInLibraryToggle
