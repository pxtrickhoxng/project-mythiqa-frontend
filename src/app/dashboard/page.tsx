import OverviewHeader from '../Components/Dashboard/OverviewHeader';
import QuickActions from '../Components/Dashboard/QuickActions';
import Stories from '../Components/Dashboard/Stories';
const page = async () => {
  return (
    <div className='p-6 space-y-6'>
      <OverviewHeader />
      <QuickActions />
      <Stories />
    </div>
  );
};

export default page;
