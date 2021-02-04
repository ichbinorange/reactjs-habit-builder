import React, { useState } from 'react';
import { getHabits } from '../util/ApiUtils';
import { postHabit } from '../util/ApiUtils';
import HabitCard from './HabitCard';

const Habit: React.FC<{ content: string }> = (props) => {
  const [habitList, setHabitList] = useState<List>([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadCurrentlyLoggedInUser = () => {
    setLoading(true)
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });    
  }

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  const addHabit = (habit) => {
    axios.post(`${props.url}`, habit)
    .then((response) => {
      const updatedData = [...habitList, response.data];
      setHabitList(updatedData);
      setErrorMessage('');
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
  }

  return (
    <div>
      <h1>habits</h1>
      <HabitCard addHabitCallback={addHabit}/>
    </div>
  );
}

export default Habit;