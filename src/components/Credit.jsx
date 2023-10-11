import SideBar from "./SideBar";

function Credit() {
  return (
    <div id="outer-container">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div id="page-wrap" className="container">
        <h3>จัดทำโดย</h3>
        <h1>
          นายธาดา ศรีสลวยกุล <br /> นางสาวบัณฑิตา ศรีอรุโณทัย <br /> นายภูผา
          ศิริรัตน์
        </h1>
      </div>
    </div>
  );
}

export default Credit;
