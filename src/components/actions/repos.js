import axios from 'axios'
import { setFetchError, setFetching, setRepos } from '../../reducers/reposReducer'

export const getRepos = (searchQuery = 'stars:%3E1', currentPage, perPage) => {
  if (!searchQuery) {
    searchQuery = 'stars:%3E1'
  }
  return async dispath => {
    try {
      dispath(setFetching(true))
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=start&per_page=${perPage}&page=${currentPage}`
      )
      return dispath(setRepos(response.data))
    } catch (error) {
      dispath(setFetchError(true))
      dispath(setFetching(false))
      setTimeout(() => dispath(setFetchError(false)), 3000)
    }
  }
}

export const getCurrentRepo = async (username, repoName, setRepo) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
  setRepo(response.data)
}

export const getContributors = async (username, repoName, setContributors) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`)
  setContributors(response.data)
}