import OverviewHeader from '../Components/Dashboard/OverviewHeader';
import QuickActions from '../Components/Dashboard/QuickActions';
import Stories from '../Components/Dashboard/Stories';
import Success from '../Components/Dashboard/Success';

const page = async ({ searchParams }: { searchParams: { success?: string } }) => {
  const { success } = await searchParams;
  return (
    <div className='p-6 space-y-6'>
      <OverviewHeader />
      <QuickActions />
      <Stories />
      <Success success={success} />
    </div>
  );
};

export default page;
