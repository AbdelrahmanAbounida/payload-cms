import Navbar from "@/components/layout/navbar/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col  ">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
