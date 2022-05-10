import { isArray, isEmpty, isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR, { ConfigInterface } from 'swr'

/*
 * Compare two objects by reducing an array of keys in obj1, having the
 * keys in obj2 as the initial value of the result. Key points:
 *
 * — All keys of obj2 are initially in the result.
 *
 * — If the loop finds a key (from obj1, remember) not in obj2, it adds
 * it to the result.
 *
 * — If the loop finds a key that are both in obj1 and obj2, it compares
 * the value. If it’s the same value, the key is removed from the result.
 */
export function getObjectDifference(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key)
    }
    return result
  }, Object.keys(obj2))
  return Object.fromEntries(
    diff.map((key) => {
      return [key, obj2[key]]
    })
  )
}

export function useCrud(url, key, fetchOptions) {
  const [loading, setIsLoading] = useState(true)

  const loadingTimeout = () => {
    setIsLoading(false)
  }

  const fetch = useCallback(async (url) => {
    const response = await fetch(url)
    return response
  }, [])

  const { data, error, isValidating, mutate } = useSWR(url, fetch, {
    ...fetchOptions,
  })

  useEffect(() => {
    if (isValidating) {
      setIsLoading(true)
      return
    }
    setTimeout(loadingTimeout, 500)
  }, [isValidating])

  const create = useCallback(
    async (newObject, shouldRevalidate = false) => {
      const response = await fetch(url, {
        body: newObject,
        method: 'POST',
      })
      const result = response
      if (data && mutate) {
        let newData = data
        if (isArray(data)) {
          newData = data.concat(result)
        }
        await mutate([...new Set(newData)], shouldRevalidate)
      }
      return result
    },
    [url, data, mutate]
  )
  
  const createMultiple = useCallback(
    async (newObjects, shouldRevalidate = false) => {
      const response = await fetch(url, {
        body: newObjects,
        method: 'POST',
      })
      const result = response
      if (data && mutate) {
        await mutate([...data, ...result], shouldRevalidate)
      }
      return result
    },
    [url, data, mutate]
  )
  const remove = useCallback(
    async (body, shouldRevalidate = false) => {
      const response = await fetch(url, {
        body,
        method: 'DELETE',
      })
      const result = response
      if (data && mutate) {
        if (isArray(result)) {
          const updatedObjects = [...data].filter((current) => {
            const isDeleted = result.find(
              (result) => result[key] === current[key]
            )
            return !isDeleted
          })
          await mutate(
            result.length === 0 ? [] : updatedObjects,
            shouldRevalidate
          )
        } else {
          const deletedIndex = data.findIndex(
            (object) => object[key] === result[key]
          )
          if (deletedIndex >= 0) {
            const updatedObjects = [...data]
            updatedObjects.splice(deletedIndex, 1)
            await mutate(updatedObjects, shouldRevalidate)
          }
        }
      }
      return result
    },
    [url, data, key, mutate]
  )
  const removeMultiple = useCallback(
    async (ids, shouldRevalidate = false) => {
      const response = await fetch(url, {
        body: ids,
        method: 'DELETE',
      })
      const results = response
      if (data && mutate) {
        const updatedObjects = [...data].filter((current) => {
          const isDeleted = results.find(
            (result) => result[key] === current[key]
          )
          return !isDeleted
        })
        await mutate(updatedObjects, shouldRevalidate)
        return results
      }
    },
    [url, data, key, mutate]
  )
  const update = useCallback(
    async (updatedObject, shouldRevalidate = false) => {
      const currentObjectIndex = data.findIndex(
        (object) => object[key] === updatedObject[key]
      )
      const currentObject = data[currentObjectIndex]
      const diff = currentObject
        ? getObjectDifference(currentObject, updatedObject)
        : null
      if (!diff) {
        throw new Error('Update Failed')
      }
      if (isEmpty(diff)) {
        return currentObject
      }
      const response = await fetch(url, {
        body: { ...diff, id: updatedObject[key] },
        method: 'PATCH',
      })
      if (data && mutate) {
        const updatedObjects = [...data]
        updatedObjects.splice(currentObjectIndex, 1, response)
        await mutate(updatedObjects, shouldRevalidate)
      }
      return response
    },
    [url, data, mutate, key]
  )
  const updateMultiple = useCallback(
    async (updatedObjects, shouldRevalidate = false) => {
      const currentObjects = data.filter((object) =>
        updatedObjects.find((updated) => object[key] === updated[key])
      )
      if (!currentObjects || currentObjects <= 0) {
        throw new Error('Update Failed')
      }
      const diffs = currentObjects.map((currentObject) => {
        const updatedObject = updatedObjects.find(
          (updated) => updated[key] === currentObject[key]
        )
        return {
          ...getObjectDifference(currentObject, updatedObject),
          id: updatedObject[key],
        }
      })
      if (diffs.length <= 0) {
        return currentObjects
      }
      const response = await fetch(url, {
        body: { ...diffs },
        method: 'PATCH',
      })
      if (data && mutate) {
        const updatedObjects = [...data].map((current) => {
          if (current[key] === response[key]) {
            return response
          }
          return current
        })
        await mutate(updatedObjects, shouldRevalidate)
      }
      return response
    },
    [url, data, mutate, key]
  )
  const memoizedData = useMemo(
    () => (!isEmpty(data) ? filterDeleted(data) : []),
    [data]
  )
  return {
    create,
    createMultiple,
    fetch: { data: memoizedData, error, loading, mutate },
    remove,
    removeMultiple,
    update,
    updateMultiple,
  }
}
