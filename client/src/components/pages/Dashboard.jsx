import React, {useState} from "react";
import "./Dashboard.css";
import Header from "../modules/Header.jsx";
import Stats from "../modules/Stats.jsx";
import Trees from "../modules/Trees.jsx";
import CreateTreeButton from "../modules/CreateTreeButton";

const Dashboard = () => {
    // hardcoded data
    const userName = "Lolade";
    const [stats, setStreak] = useState(0);
    const [treeNo, settreeNo] = useState(0);
    const [trees, setTrees] = useState([]);

    //gets called when create new tree is hit to add to screen
    const createNewTree = (tree) => {
        setTrees([...trees, tree]);
    }
    //GET streaks
    useEffect (() =>{
        get("/api/streak").then((streakResponse) => {
            let streak = streakResponse;
            setStreak(streak)
        });
    }, []);

    //POST streaks
    const updateStreak = () => {
        post("/api/streak", {}).then((updatedStreakResponse) => {
            setStreak(updatedStreakResponse);
        });
    };

    // GET treeNo


    //POST treeNo
    //needs create new tree button


    // GET trees
    useEffect (() => {
        get("/api/trees").then((treesResponse) => {
            //list trees in reverse order
            let reversedTreeObjs = treesResponse.reverse();
            setTrees(reversedTreeObjs);
        });
    }, []);

    let treesList = null;
    const hasTrees = stories.length !== 0;
    if (hasTrees) {
        //not sure what TreeCard is doing here
        treesList = trees.map((treeObj) => (
            <TreeCard
                key = {'TreeCard_${treeObj._id}'}
                name = {treeObj.name}
            />
        )
    )
    }

    //POST trees

    return (
        <div>
            <handleCreateTree createTree = {createNewTree}/>
            <Header />
            <div> 
                {hasTrees ? (
                    <div>{treesList}</div>
                ) : (
                    <p>No trees available.</p>
                )}
            
            </div>
        </div>
    );
};

export default Dashboard;
