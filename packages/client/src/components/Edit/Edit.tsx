import { FactionProps } from '../../types';
import AddForm from '../AddForm';
import DeleteForm from '../DeleteForm';
import EditForm from '../EditForm';

const mockData: FactionProps = {
  name: 'Hogs of Anarchy',
  nickname: 'HOA',
  hasBench: true,
  benchCount: 1,
  associates: [],
  allies: [
    'e2d44500-7bf8-4fc0-9b7f-11f5372ee9ef',
    '113ff07b-56ac-45de-a96d-4977351d59ac',
    '1d261bac-e578-4ee7-a491-4c3a3922d026',
    'cf55fdc5-2a77-4cd7-ad6e-90f18217aafc',
    'd2820226-2a43-45d1-9e2e-1baed964b165',
    '96a3d4e3-2f81-4fea-9d09-f03edb836449',
    '80730f7a-90ea-47d0-8964-0ae1fb4a0e24',
    '56a9975c-ee0e-4635-b8ea-102b6ed3c6c3',
    '84e4e7b1-0ec8-44e9-a0b6-dfad765ed572',
  ],
  friends: [
    'b4a0bc08-4f5c-4da9-9245-05ae288327b4',
    'a9a38527-43fa-4e7a-9b7a-b183c7db2905',
    '9c900326-b0dd-4e74-8a57-b3e3a4cb3fad',
    'aa32983d-de3d-4002-8709-234d7642da24',
  ],
  hotWar: [],
  coldWar: ['a51b26d1-35ca-4681-b319-435e959484a1'],
  enemies: ['5e7e416f-bc93-49ca-935a-ea9611f12129'],
  active: true,
  order: 0,
};

function Edit() {
  return (
    <>
      <AddForm />
      <EditForm {...mockData} />
      <DeleteForm />
    </>
  );
}

export default Edit;
