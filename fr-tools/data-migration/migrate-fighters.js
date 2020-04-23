const path = require('path');
const { DateTime } = require('luxon');
const { processLineByLine, decodeData, toNumber, toMetres } = require('./common');

module.exports = (pathToData, terms) => {
  const fightersFile = path.join(pathToData, 'fighters.csv');
  const fightersDataFile = path.join(pathToData, 'fighters-data.csv');

  const processResults = ([fighters, meta]) => {
    const db = fighters.reduce((acc, fighter) => ({
      ...acc,
      [fighter.ID]: fighter
    }), {});

    meta.forEach(({ post_id, meta_key, meta_value }) => {
      db[post_id][meta_key] = meta_value;
    });

    return db;
  };

  const processEncodedFields = (fighter, db) => {
    const {
      mma_sport_magazine_fighter_profile_history = '',
      mma_sport_magazine_fighter_profile_stats = ''
    } = fighter;

    const history = mma_sport_magazine_fighter_profile_history
      ? decodeData(mma_sport_magazine_fighter_profile_history) : [];
    const stats = mma_sport_magazine_fighter_profile_stats
      ? decodeData(mma_sport_magazine_fighter_profile_stats) : [];

    // console.log(stats);

    return {
      ...fighter,
      profile_history: history,
      profile_stats: stats
    };
  };

  const mapToNewSchema = (fighter, db) => {
    const raw = processEncodedFields(fighter);

    const {
      ID, guid, post_date_gmt, post_modified_gmt,
      post_title, post_status, profile_history, profile_stats,

      mma_sport_magazine_post_views_count,

      mma_sport_magazine_fighter_nickname,
      mma_sport_magazine_fighter_profile_date_day,
      mma_sport_magazine_fighter_profile_date_month,
      mma_sport_magazine_fighter_profile_date_year,
      mma_sport_magazine_fighter_profile_medium_image,
      mma_sport_magazine_fighter_profile_country,
      mma_sport_magazine_fighter_profile_team_name,
      mma_sport_magazine_fighter_profile_loss,
      mma_sport_magazine_fighter_profile_win,
      mma_sport_magazine_fighter_profile_draw,
      mma_sport_magazine_fighter_profile_class,
      mma_sport_magazine_fighter_profile_small_image,
      mma_sport_magazine_fighter_profile_flag_image,
      mma_sport_magazine_fighter_profile_city,
      mma_sport_magazine_fighter_profile_height,
      mma_sport_magazine_fighter_profile_weight,

      _yoast_wpseo_primary_promotion_company,
      _yoast_wpseo_primary_discipline,
      _yoast_wpseo_primary_city,
      _yoast_wpseo_primary_mma_team,
      _yoast_wpseo_primary_mma_weight_class,
      _yoast_wpseo_primary_gender
    } = raw;

    const mapped = {
      _meta: {
        created: post_date_gmt,
        modified: post_modified_gmt,
        legacy: {
          ID,
          post_status,
          profile_stats,
          mma_sport_magazine_post_views_count
        },
      },
      name: post_title,
      alias: mma_sport_magazine_fighter_nickname,
      gender: terms[_yoast_wpseo_primary_gender],
      dob: mma_sport_magazine_fighter_profile_date_year &&
        mma_sport_magazine_fighter_profile_date_month &&
        mma_sport_magazine_fighter_profile_date_day && DateTime
          .fromObject({
            year: toNumber(mma_sport_magazine_fighter_profile_date_year),
            month: toNumber(mma_sport_magazine_fighter_profile_date_month),
            day: toNumber(mma_sport_magazine_fighter_profile_date_day)
          })
          .toISODate(),
      country: mma_sport_magazine_fighter_profile_country,
      region: terms[_yoast_wpseo_primary_city],
      city: mma_sport_magazine_fighter_profile_city,
      height: toMetres(mma_sport_magazine_fighter_profile_height),
      weight: mma_sport_magazine_fighter_profile_weight,
      record: [
        {
          discipline: terms[_yoast_wpseo_primary_discipline],
          lost: toNumber(mma_sport_magazine_fighter_profile_loss),
          won: toNumber(mma_sport_magazine_fighter_profile_win),
          draw: toNumber(mma_sport_magazine_fighter_profile_draw)
        }
      ],
      media: {
        websiteLink: guid,
        images: {
          medium: mma_sport_magazine_fighter_profile_medium_image,
          small: mma_sport_magazine_fighter_profile_small_image,
          flag: mma_sport_magazine_fighter_profile_flag_image
        }
      },
      team: mma_sport_magazine_fighter_profile_team_name && terms[mma_sport_magazine_fighter_profile_team_name],
      class: mma_sport_magazine_fighter_profile_class && terms[mma_sport_magazine_fighter_profile_class],
      history: profile_history.filter(({ opponent, result }) => opponent && result)
    }

    return mapped;
  };

  return Promise.all([
    processLineByLine(fightersFile),
    processLineByLine(fightersDataFile)
  ])
    .then(processResults)
    .then(db => [Object.values(db), db])
    .then(([fighters, db]) => fighters.map(f => mapToNewSchema(f, db)));
};