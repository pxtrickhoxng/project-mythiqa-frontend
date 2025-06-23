import Sidebar from '../Components/Dashboard/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-[calc(100vh-3rem)] w-full bg-gray-100 mt-12'>
      <Sidebar />
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  );
};

export default layout;
