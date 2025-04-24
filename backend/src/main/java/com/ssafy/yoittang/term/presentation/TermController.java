package com.ssafy.yoittang.term.presentation;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.term.application.TermService;
import com.ssafy.yoittang.term.domain.request.MemberTermCreateRequest;
import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermSummaryGetResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("term")
public class TermController {

    private final TermService termService;

    @GetMapping
    public ResponseEntity<List<TermSummaryGetResponse>> getTermSummary() {
        return ResponseEntity.ok(termService.getTermSummary());
    }

    @GetMapping("/{termId}")
    public ResponseEntity<TermDetailGetResponse> getTermDetailsByTermId(@PathVariable(name = "termId") Long termId
    ) {
        return ResponseEntity.ok(termService.getTermDetailsByTermId(termId));
    }

    @PostMapping
    public ResponseEntity<Void> createMemberTermAgreement(
            @Valid @RequestBody MemberTermCreateRequest memberTermCreateRequest,
            @AuthMember Member member
    ) {
        termService.createMemberTermAgreement(memberTermCreateRequest, member);
        return ResponseEntity.created(URI.create("/api/v1/term")).build();
    }
}
