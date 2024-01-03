export default function NewProject() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Create New Project</h1>
      <form className="space-y-2">
        <div className="flex flex-col w-1/3 gap-2">
          <label>Name</label>
          <input
            type="text"
            className="bg-slate-600 py-1 px-1 rounded-md text-lg"
          ></input>
        </div>
        <div className="flex flex-col w-1/3 gap-2">
          <label>Description</label>
          <textarea className="bg-slate-600 py-1 px-1 rounded-md text-lg"></textarea>
        </div>
      </form>
    </div>
  );
}
