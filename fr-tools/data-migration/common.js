const fs = require('fs');
const readline = require('readline');

exports.toNumber = strNum => strNum === 'zero' ? 0 : Number(strNum);

exports.toMetres = feetInches => {
  if (!feetInches) return;

  const [feet, inches] = feetInches
    .split(`'`)
    .map(v => Number(v.replace('"', '')));

  return Number((((feet * 12) + inches) * 0.0254).toFixed(2));
};

exports.processLineByLine = async (filename) => {
  const records = [];
  const input = fs.createReadStream(filename);
  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  let fieldNames;
  for await (const line of rl) {
    if (!fieldNames) {
      fieldNames = line
        .split('`;`')
        .map(field => field.replace(/^`+|`+$/g, ''));
    } else {
      values = line.split('`;`');
      const record = fieldNames.reduce((acc, key, index) => {
        const trimmedValue = values[index]
          ? values[index].replace(/^`+|`+$/g, '')
          : null;
        return { ...acc, [key]: trimmedValue };
      }, {});

      records.push(record);
    }
  }

  return records;
}

const decodeObject = (size, parts) => {
  let result;
  let remaining;

  const { type } = parts[0];
  if (type === 'i') {
    result = [];
    let remaining = parts.slice(1);
    for (let i = 0; i < size; i++) {
      const outcome = decodeParts(remaining);
      result.push(outcome.result);
      remaining = outcome.remaining.slice(1); // the extra one is the index
    }
  } else if (type === 's') {
    result = {};
    for (let i = 0; i < size * 2; i += 2) {
      const key = parts[i].data
        .replace('mma_sport_magazine_fighter_profile_stat_', '')
        .replace('mma_sport_magazine_fighter_history_', '');
      result[key] = parts[i + 1].data;
    }
    remaining = parts.slice(size * 2);
  }

  return { result, remaining };
};

const decodeParts = parts => {
  const { type, size } = parts[0];
  if (type === 'a') {
    return decodeObject(size, parts.slice(1));
  } else {
    console.error('Unexpected Type', type);
  }
};

exports.decodeData = data => {
  const parts = data
    .split(/[\{\}\;]+/)
    .filter(part => part.length > 0)
    .map(part => {
      const [type, size, data] = part.split(':');
      return { type, size, data: data && data.replace(/["]+/g, '') };
    });

  const { result } = decodeParts(parts);
  return result;
};
