import axios from 'axios'

function Repos({userRepos}) {
  return (
    <div className="root">
      {
        userRepos.items.map((repo) => (
          <p key={repo.id} style={{'marginBottom': '20px'}}>
            {`${repo.owner.login}/${repo.name}`}
          </p>
        ))
      }
    </div>
  )
}

Repos.getInitialProps = async ({router: { query: { page = 1 } }}) => {

  const {data: userRepos} = await axios.get(`https://api.github.com/search/repositories?q=react&page=${page}`)

  return {
    userRepos: userRepos
  }

}

export default Repos