import React from 'react';
import RepositoryListContainer from '../../components/RepositoryListContainer';

import { render } from '@testing-library/react-native';
import { expect } from '@jest/globals';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        
        // Add your test code here
        const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
        // console.log(debug())
        const firstRepo = repositories.edges[0].node;
        const secondRepo = repositories.edges[1].node;

        const repoNames = getAllByTestId('fullname');
        const firstRepoName = repoNames[0];
        const secondRepoName = repoNames[1];
        expect(firstRepoName).toHaveTextContent(firstRepo.fullName);
        expect(secondRepoName).toHaveTextContent(secondRepo.fullName);

        const repoDesc = getAllByTestId('description');
        const firstRepoDesc = repoDesc[0];
        const secondRepoDesc = repoDesc[1];
        expect(firstRepoDesc).toHaveTextContent(firstRepo.description);
        expect(secondRepoDesc).toHaveTextContent(secondRepo.description);

        const repoLang = getAllByTestId('language');
        const firstRepoLang = repoLang[0];
        const secondRepoLang = repoLang[1];
        expect(firstRepoLang).toHaveTextContent(firstRepo.language);
        expect(secondRepoLang).toHaveTextContent(secondRepo.language);

        const roundNum = (num) => {
          return (num/1000).toFixed(1);
        };
        const repoStars = getAllByTestId('stars');
        const firstRepoStars = repoStars[0];
        const secondRepoStars = repoStars[1];
        expect(firstRepoStars).toHaveTextContent(roundNum(firstRepo.stargazersCount));
        expect(secondRepoStars).toHaveTextContent(roundNum(secondRepo.stargazersCount));

        const repoForks = getAllByTestId('forks');
        const firstRepoForks = repoForks[0];
        const secondRepoForks = repoForks[1];
        expect(firstRepoForks).toHaveTextContent(roundNum(firstRepo.forksCount));
        expect(secondRepoForks).toHaveTextContent(roundNum(secondRepo.forksCount));

        const repoReviews = getAllByTestId('reviews');
        const firstRepoReviews = repoReviews[0];
        const secondRepoReviews = repoReviews[1];
        expect(firstRepoReviews).toHaveTextContent(firstRepo.reviewCount);
        expect(secondRepoReviews).toHaveTextContent(secondRepo.reviewCount);

        const repoRatings = getAllByTestId('ratings');
        const firstRepoRatings = repoRatings[0];
        const secondRepoRatings = repoRatings[1];
        expect(firstRepoRatings).toHaveTextContent(firstRepo.ratingAverage);
        expect(secondRepoRatings).toHaveTextContent(secondRepo.ratingAverage);

      });
    });
  });
  