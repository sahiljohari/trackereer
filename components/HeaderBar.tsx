interface HeaderBarProps {
  name: string;
}

const HeaderBar = ({ name }: HeaderBarProps) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row place-content-between">
        <h1 className="text-xl font-medium leading-tight text-gray-900 my-auto">
          Greetings, {name}! 👋
        </h1>
      </div>
    </header>
  );
};

export default HeaderBar;
