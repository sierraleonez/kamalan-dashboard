import { Root, Thumb } from '@radix-ui/react-switch';

export default function Switch() {
  return (
    <Root className="relative h-[25px] w-[42px] cursor-default rounded-full bg-blackA6 outline outline-black data-[state=checked]:bg-black" id="airplane-mode">
      <Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white outline-black outline transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </Root>
  );
}