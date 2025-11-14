type Props = {
  children: React.ReactNode;
  styles?: string
};

export default function Wrapper({ children, styles = '' }: Props) {
  return (
    <div className={"my-0 mx-auto px-4 max-w-(--tablet-width) md:max-w-(--content-width) md:px-10 " + styles}>
      {children}
    </div>
  )
}