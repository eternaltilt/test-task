import TableOfUsers from "../TableOfUsers/TableOfUsers";
import users from '../../users/ForTable.json';

function App() {
  console.log('USERS --> ', users[0]);
  return (
    <div className="App">
      <TableOfUsers users={users}/>
    </div>
  );
}

export default App;
