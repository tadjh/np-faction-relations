import clsx from 'clsx';
import { ChangeEventHandler, useState } from 'react';
import Input from '../../../../../../../../components/Inputs/TextInput';
import { TimestampedFaction, Website } from '../../../../../../../../types';
import {
  composeOptionKey,
  composeInputKey,
} from '../../../../../../../../utils/compose';
import {
  LABEL_TEXT_ADD_WEBSITE,
  LABEL_TEXT_DISCORD,
  LABEL_TEXT_SELECT_WEBSITE,
  LABEL_TEXT_SUBREDDIT,
  LABEL_TEXT_WIKI,
} from '../../../../config/strings';
import { UseFormData } from '../../hooks';

const links = [LABEL_TEXT_WIKI, LABEL_TEXT_SUBREDDIT, LABEL_TEXT_DISCORD];

function getUrl(faction: TimestampedFaction, website: Website) {
  return faction.urls[website];
}

function FormInfoExtended({ state, handlers }: UseFormData) {
  const { handleUrls } = handlers;
  const [selected, setSelected] = useState(-1);

  const handleLink: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selected = parseInt(event.target.value);
    setSelected(selected);
  };

  return (
    <div className="flex flex-col gap-y-2 px-2">
      <label htmlFor="add-link-select" className="flex items-center gap-x-1">
        <span className="w-1/3">{LABEL_TEXT_ADD_WEBSITE}</span>
        <select
          name="add-link-select"
          className="flex-1 cursor-pointer border"
          onChange={handleLink}
        >
          <option value={-1}>{LABEL_TEXT_SELECT_WEBSITE}</option>
          {links.map((link, index) => {
            const website = link as Website;
            const value = getUrl(state, website);
            if (value !== '') return null;
            return (
              <option key={composeOptionKey(website, index)} value={index}>
                {website}
              </option>
            );
          })}
        </select>
      </label>
      <div>
        {links.map((link, index) => {
          const website = link as Website;
          const value = getUrl(state, website);
          return (
            <Input
              key={composeInputKey(website, index)}
              name={website}
              type="url"
              value={value}
              onChange={(event) => handleUrls(event, website)}
              autoComplete="off"
              className={clsx(
                'transition-all',
                value === '' && index !== selected
                  ? 'h-0 opacity-0'
                  : 'mb-2 h-5 opacity-100'
              )}
            >
              {website}
            </Input>
          );
        })}
      </div>
    </div>
  );
}

export default FormInfoExtended;
