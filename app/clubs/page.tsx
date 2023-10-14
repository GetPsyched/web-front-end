import { Fragment } from 'react';

import ClubCard from '@/components/club-card';
import DefaultLayout from '@/components/default-layout';
import api from '@/utils/api-actions';

export const metadata = {
  title: 'Clubs',
  description:
    'Check out all the official/unofficial clubs and societies of NIT-KKR',
};

const clubCategories = [
  'Cultural Club',
  'Technical Club',
  'Technical Society',
  'Magazine',
  'Crew',
  'Committee',
] as const;

const getCategorisedClubs = (
  category: ClubCategory,
  clubs: Array<ClubBasic>
) => {
  const filteredClubs = clubs.filter((club) => club.category === category);

  if (filteredClubs.length === 0)
    return <p className='text-red-400'>No club found for the {category} category</p>;

  return filteredClubs.map((club, index) => (
    <li key={index}>
      <ClubCard club={club} />
    </li>
  ));
};

export default async function ClubsPage() {
  const clubs: Array<ClubBasic> = await api.GET('/clubs');

  return (
    <DefaultLayout
      title="Clubs"
      description="An overview all the clubs and societies of NIT-KKR"
      prompt={
        <>
          <p className="inline-flex">
            The cards of only the following clubs are enabled:
          </p>
          <ul>
            {clubs.map((club) => {
              if (club.short_description === 'Lorem Ipsum') {
                return <></>;
              } else {
                return <li>{club.short_name}</li>;
              }
            })}
          </ul>
        </>
      }
      alert={true}
    >
      {clubCategories.map((category: ClubCategory, categoryIndex) => {
        return (
          <Fragment key={categoryIndex}>
            <h2 className='text-palette-700 dark:text-palette-100'>{category}</h2>
            <ol className="flex flex-row flex-wrap gap-2 sm:gap-4 mb-8">
              {getCategorisedClubs(category, clubs)}
            </ol>
          </Fragment>
        );
      })}
    </DefaultLayout>
  );
}
