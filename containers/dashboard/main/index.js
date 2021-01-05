import PropTypes from "prop-types";
import { Text } from "@/components/text";
import { Container } from "@/components/container";
import { PostList } from "@/components/post-list";
import style from "./dashboard.module.css";

export const DashboardMain = ({ blogs, projects, logs }) => {
    return (
        <Container>
            <div className={style.title}>
                <Text h1 b>
                    Blog Dashboard
                </Text>
                <Text size="xl" color="primary-200" b>
                    You can control everything about website in this page that
                    you can edit the posts, view the stats etc.
                </Text>
            </div>
            <div className={style.container}>
                <div className={style.post_col}>
                    <PostList title={"Blog"} list={blogs} />
                    <PostList title={"Project"} projects={projects} />
                </div>
                <div className={style.main_col}>
                    <Text h2 b>
                        Activity
                    </Text>
                    {logs?.map((l, i) => (
                        <div key={i} className={style.log_item}>
                            <div className={style.log_content}>
                                <Text size="xl" p b>
                                    {l?.title}
                                </Text>
                                {l?.description && (
                                    <Text>{l.description} </Text>
                                )}
                            </div>
                            <Text color="primary-200"> {l?.date}</Text>
                        </div>
                    ))}
                    {(!logs || logs.length < 1) && (
                        <Text h3 color="primary-200">
                            Activity is not found
                        </Text>
                    )}
                </div>
            </div>
        </Container>
    );
};

DashboardMain.propTypes = {
    blogs: PropTypes.array,
    projects: PropTypes.array,
    logs: PropTypes.array,
};
