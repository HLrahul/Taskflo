export default function Footer () {
    return (
      <div className="absolute w-full flex items-center justify-center bottom-5">
        <p className="text-sm text-foreground">
          Crafted by{" "}
          <a
            href="https://github.com/HLrahul"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Rahul
          </a>
          . The source code is on{" "}
          <a
            href="https://github.com/HLrahul/Taskflo"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    );
}