interface SearchProps{
  onSearch: (query: string) => void
}
export const Search: React.FC<SearchProps> = ({onSearch}) => {
  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    onSearch(e.target.value)
  }
  return (
    <input type="text"
    className="min-w-1xl h-15 border-4 rounded-3xl text-center mb-5"
    onChange={onChange}
    placeholder="Aquaman"
    />
  )
}

