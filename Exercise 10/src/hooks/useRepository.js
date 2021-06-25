import { useQuery } from '@apollo/client';
import { ALL_REPOS } from '../graphql/queries';

//this is api way of doing
//const useRepositories = () => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  // const result = useQuery(ALL_REPOS, {
  //   fetchPolicy: 'cache-and-network',
  // });

  // useEffect(() => {
  //   if (result.data) {
  //     setRepositories(result.data.repositories.edges.map(({ node }) => node));
  //   }
  // },[result]);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // //this is the version that uses the fetch API
  //   // const response = await fetch('http://172.31.7.241:5000/api/repositories');
  //   console.log(response);

  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

//this is graphql way of doing
const useRepositories = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    ALL_REPOS,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: ALL_REPOS,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  const repositories = data?.repositories;
  return {
    repositories,
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};
export default useRepositories;
