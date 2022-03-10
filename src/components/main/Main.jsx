import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRepos } from '../actions/repos'
import Repo from './repo/Repo'
import './main.less'
import { setCurrentPage } from '../../reducers/reposReducer'
import createPages from '../../utils/createPages'

export default function Main() {
  const dispath = useDispatch()
  const items = useSelector(state => state.repos.items)
  const isFetching = useSelector(state => state.repos.isFetching)
  const currentPage = useSelector(state => state.repos.currentPage)
  const totalCount = useSelector(state => state.repos.totalCount)
  const perPage = useSelector(state => state.repos.perPage)
  const isFetchError = useSelector(state => state.repos.isFetchError)
  const pagesCount = Math.ceil(totalCount / perPage)
  const [searchText, setSearchText] = useState('')
  const pages = []
  createPages(pages, pagesCount, currentPage)

  useEffect(() => {
    dispath(getRepos(searchText, currentPage, perPage))
  }, [currentPage])

  const search = () => {
    dispath(setCurrentPage(1))
    dispath(getRepos(searchText, currentPage, perPage))
  }
  
  return (
    <div>
      
      {isFetchError && 
        <div class="alert alert-danger" role="alert">
          Request ERROR
        </div>
      }

      <div className="search">
        <input type="text" className="search-input" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <button className="search-btn" onClick={search}>Search</button>
      </div>

      {isFetching
        ? <h1>Loading...</h1>
        : !!items.length && items.map(item => (
        <Repo key={item.id} repo={item}/>
      ))}

      <div className="pages">
        {!!pages.length && pages.map((page, index) => (
          <span
            key={index}
            className={currentPage === page ? 'currentpage' : 'page'}
            onClick={() => dispath(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  )
}
