import CreateStoryPage from '@/app/Components/Dashboard/CreateStoryPage';
import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';

const page = () => {
  return (
    <div>
      <ReturnToDashboard />
      <CreateStoryPage />
    </div>
  );
};

export default page;
