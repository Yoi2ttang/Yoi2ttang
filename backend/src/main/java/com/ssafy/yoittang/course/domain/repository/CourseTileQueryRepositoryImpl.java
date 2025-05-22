package com.ssafy.yoittang.course.domain.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.QCourseTile;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CourseTileQueryRepositoryImpl implements CourseTileQueryRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public Map<Long, Long> countCourseTileByCourseIds(List<Long> courseIds) {
        QCourseTile qCourseTile = QCourseTile.courseTile;
        List<Tuple> results = queryFactory
                .select(qCourseTile.courseId, qCourseTile.geoHash.count())
                .from(qCourseTile)
                .where(qCourseTile.courseId.in(courseIds))
                .groupBy(qCourseTile.courseId)
                .fetch();

        return results.stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(qCourseTile.courseId),
                        tuple -> Optional.ofNullable(tuple.get(qCourseTile.geoHash.count())).orElse(0L)
                ));
    }

    @Override
    public Long countCourseTileByCourseId(Long courseId) {
        QCourseTile qCourseTile = QCourseTile.courseTile;
        return queryFactory
                .select(qCourseTile.geoHash.count())
                .from(qCourseTile)
                .where(qCourseTile.courseId.eq(courseId))
                .fetchOne();
    }
}
