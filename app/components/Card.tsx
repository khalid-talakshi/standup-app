export interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props) => {
  return (
    <div className="bg-slate-500 text-white p-4 rounded-lg flex flex-col gap-2 items-center shadow-xl shadow-black">
      {children}
    </div>
  );
};
