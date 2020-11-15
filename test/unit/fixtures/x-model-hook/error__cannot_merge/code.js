const A = () => {
  const [[data], setData] = useState(0)
  return <input v-model-hook={data}/>
}
