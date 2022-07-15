import { ChangeEvent, FC, useEffect, useState } from 'react';
import { RepoCart } from '../components';
import { useDebounce } from '../hooks/debounce';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api';

export const HomePage: FC = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounce = useDebounce(search);
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();
  const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
    skip: debounce.length < 3,
    refetchOnFocus: true,
  });

  useEffect(() => {
    setDropdown(debounce.length >= 3 && data?.length! > 0);
  }, [debounce, data]);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="flex justify-content pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-red-600 text-center">Something went wrong...</p>
      )}
      <div className="relative w-[560px] mx-auto">
        <input
          placeholder="Search for Github username..."
          type="text"
          className="border px-4 py-2 w-full mb-2 h-[42px]"
          value={search}
          onChange={searchHandler}
        />
        {dropdown && (
          <ul className="overflow-y-scroll list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                key={user.id}
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <p className="text-center">Repos are loading...</p>}
          {repos?.map((repo) => <RepoCart key={repo.id} repo={repo}/>)}
        </div>
      </div>
    </div>
  );
};
