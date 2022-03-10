import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentRepo, getContributors } from '../../actions/repos';
import './card.less'


export default function Card() {
  const navigate = useNavigate()
  const {reponame, username} = useParams()
  const [repo, setRepo] = useState({})
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo)
    getContributors(username, reponame, setContributors)
  }, [])
  

  return (
    <>
      <button onClick={() => navigate('/')}>Go back</button>
      <div className="card">
        <img src={repo.owner?.avatar_url} alt="" />
        <div className="name">{repo.name}</div>
        <div className="stars">stars: ({repo.stargazers_count})</div>
      </div>
        <ul>
          {!!contributors.length && contributors.map((cont, index) => (
            <li key={index}>{cont.login}</li>
          ))}
        </ul>
    </>
  )
}
