interface CountdownProps {
  count: number
}

const Countdown = ({ count }: CountdownProps) => {
  return (
    <div className="flex h-dvh items-center justify-center bg-black text-9xl font-bold text-white">
      <div>{count}</div>
    </div>
  )
}

export default Countdown
